# frozen_string_literal: true
class OccurrenceSerializer < ActiveModel::Serializer
  attributes :id, :team, :name, :start, :end, :time_zone

  def id
    object.event.to_param
  end

  def team
    object.event.team.to_param
  end

  def name
    object.event.name
  end

  def start
    with_appropriate_time_zone { object.starts_at.iso8601 }
  end

  def end
    with_appropriate_time_zone { object.ends_at.iso8601 }
  end

  def time_zone
    ActiveSupport::TimeZone::MAPPING[object.event.time_zone.name]
  end

  private

  def with_appropriate_time_zone(&block)
    Time.use_zone(object.event.time_zone, &block)
  end
end
