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
    case rule
    when nil then false
    when IceCube::WeeklyRule
      {
        interval: 'week',
        step: rule.interval,
        until: rule.until_time.end_of_day
      }
    end
  end

  private

  def schedule
    @schedule ||= object.schedule
  end

  def rule
    schedule.recurrence_rules.first
  end
end
