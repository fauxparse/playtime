# frozen_string_literal: true
class OccurrenceSerializer < ActiveModel::Serializer
  attributes :team, :event, :date, :time

  def team
    object.event.team.to_param
  end

  def event
    object.event.to_param
  end

  def date
    with_appropriate_time_zone { object.starts_at.to_date.to_param }
  end

  def time
    with_appropriate_time_zone { object.starts_at.iso8601 }
  end

  private

  def with_appropriate_time_zone(&block)
    Time.use_zone(object.event.time_zone, &block)
  end
end
