# frozen_string_literal: true
class Event < ApplicationRecord
  include Sluggable
  sluggable

  belongs_to :team

  composed_of :schedule,
    class_name: 'IceCube::Schedule',
    mapping: %w(schedule_options to_yaml),
    constructor: ->(yaml) { Event.schedule_from_yaml(yaml) }

  before_validation :cache_boundaries

  validates :name, :schedule, :starts_at, presence: true

  def time_zone
    team.try(:time_zone) || Time.zone
  end

  def occurrences
    @occurrences ||= Occurrences.new(self)
  end

  def self.within(start_date, end_date)
    where(
      'starts_at < :end ' \
      'AND (stops_repeating_at IS NULL OR stops_repeating_at > :start)',
      start: start_date.beginning_of_day,
      end: end_date.end_of_day
    )
  end

  def self.schedule_from_yaml(yaml)
    if yaml.present?
      IceCube::Schedule.from_yaml(yaml)
    else
      IceCube::Schedule.new(Time.now.beginning_of_minute, duration: 1.hour)
    end
  end

  private

  def cache_boundaries
    self.starts_at = schedule.start_time
    self.stops_repeating_at =
      schedule.terminating? ? schedule.last + schedule.duration : nil
  end
end
