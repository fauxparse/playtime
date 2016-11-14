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

  def self.schedule_from_yaml(yaml)
    if yaml.present?
      IceCube::Schedule.from_yaml(yaml)
    else
      IceCube::Schedule.new(Time.zone.now, duration: 1.hour)
    end
  end

  private

  def cache_boundaries
    self.starts_at = schedule.start_time
    self.stops_repeating_at =
      schedule.terminating? ? schedule.last + schedule.duration : nil
  end
end
