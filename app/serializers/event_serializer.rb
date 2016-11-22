# frozen_string_literal: true
class EventSerializer < ActiveModel::Serializer
  attributes :id, :team, :name, :start, :end, :repeat, :time_zone
  attribute :errors, if: :errors?

  def id
    object.to_param
  end

  def team
    object.team.to_param
  end

  def start
    schedule.start_time
  end

  def end
    schedule.end_time
  end

  def repeat
    rule.present? && RecurrenceRuleSerializer.new(rule, schedule: schedule)
  end

  def errors?
    object.errors.any?
  end

  def errors
    object.errors.to_hash(true)
  end

  def time_zone
    ActiveSupport::TimeZone::MAPPING[object.time_zone.name]
  end

  private

  def schedule
    @schedule ||= object.schedule
  end

  def rule
    @rule ||= schedule.recurrence_rules.first
  end
end
