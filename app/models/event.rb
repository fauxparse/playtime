# frozen_string_literal: true
class Event < ApplicationRecord
  include Sluggable
  sluggable

  belongs_to :team

  composed_of :schedule,
    class_name: 'IceCube::Schedule',
    mapping: %w(schedule_options to_yaml),
    constructor: ->(yaml) { Event.schedule_from_yaml(yaml) }

  validates :name, :schedule, presence: true

  def self.schedule_from_yaml(yaml)
    if yaml.present?
      IceCube::Schedule.from_yaml(yaml)
    else
      IceCube::Schedule.new(Time.zone.now, duration: 1.hour)
    end
  end
end
