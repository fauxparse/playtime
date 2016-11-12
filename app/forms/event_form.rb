# frozen_string_literal: true
class EventForm
  include ActiveModel::Validations

  attr_accessor :event, :params

  def initialize(event, params = {})
    @event = event
    assign(sanitize(params)) unless params.empty?
  end

  def assign(params)
    event.name = params[:name] if params.key?(:name)
    event.schedule = build_schedule(params)
  end

  delegate :valid?, :errors, :save, to: :event

  private

  REPEAT_PARAMETERS = [
    :interval, :step, :until,
    { weekdays: [] }, :day_of_month, :week_of_month
  ].freeze

  def sanitize(params)
    return {} if params.blank? || params[:event].blank?
    params
      .require(:event)
      .permit(
        :name, :start, :end,
        params[:event][:repeat] ? { repeat: REPEAT_PARAMETERS } : :repeat
      )
  end

  def build_schedule(params)
    return IceCube::Schedule.new unless params[:start] && params[:end]
    schedule_with_repeat(
      time_zone.parse(params[:start]),
      time_zone.parse(params[:end]),
      params[:repeat]
    )
  end

  def schedule_with_repeat(starts_at, ends_at, repeat)
    IceCube::Schedule.new(starts_at, end_time: ends_at).tap do |schedule|
      schedule.add_recurrence_rule(parse_repeat(starts_at, repeat)) if repeat
    end
  end

  def parse_repeat(start, repeat)
    rule = base_repeat_rule(start, repeat, repeat[:step] || 1)
    rule = rule.until(time_zone.parse(repeat[:until]).end_of_day) \
      if repeat[:until]
    rule
  end

  def base_repeat_rule(start, repeat, step)
    case repeat[:interval].to_sym
    when :day   then IceCube::Rule.daily(step)
    when :week  then parse_weekly_repeat(start, repeat, step)
    when :month then parse_monthly_repeat(start, repeat, step)
    when :year  then IceCube::Rule.yearly(step)
    end
  end

  def parse_weekly_repeat(start, repeat, step)
    weekdays = repeat[:weekdays] || [start.wday]
    IceCube::Rule.weekly(step).day(*weekdays)
  end

  def parse_monthly_repeat(start, repeat, step)
    rule = IceCube::Rule.monthly(step)
    if repeat[:week_of_month]
      rule.day_of_week(start.wday => [repeat[:week_of_month]])
    else
      rule.day_of_month(start.day)
    end
  end

  def time_zone
    Time.zone
  end
end
