# frozen_string_literal: true
class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :start, :end, :repeat

  def id
    object.to_param
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

  private

  def schedule
    @schedule ||= object.schedule
  end

  def rule
    @rule ||= schedule.recurrence_rules.first
  end
end
