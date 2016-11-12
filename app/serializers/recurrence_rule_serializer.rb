# frozen_string_literal: true
class RecurrenceRuleSerializer < ActiveModel::Serializer
  attributes :interval, :step, :until
  attribute :weekdays, if: :weekly?
  attribute :day_of_month, if: :monthly_by_day_of_month?
  attribute :week_of_month, if: :monthly_by_week_of_month?

  def interval
    object
      .class.name.demodulize.underscore
      .sub(/ly_rule$/, '')
      .sub(/i$/, 'y')
  end

  def step
    validations[:interval].first.interval
  end

  def until
    object.until_time.try(:end_of_day) || false
  end

  def weekdays
    (validations[:day] || []).map(&:day).tap do |weekdays|
      weekdays << schedule.start_time.wday if weekdays.empty?
    end
  end

  def day_of_month
    schedule.start_time.day
  end

  def week_of_month
    validations[:day_of_week].first.occ
  end

  def weekly?
    object.is_a?(IceCube::WeeklyRule)
  end

  def monthly?
    object.is_a?(IceCube::MonthlyRule)
  end

  def monthly_by_day_of_month?
    monthly? && !monthly_by_week_of_month?
  end

  def monthly_by_week_of_month?
    monthly? && validations[:day_of_week].present?
  end

  private

  def schedule
    instance_options[:schedule]
  end

  def validations
    object.validations
  end
end
