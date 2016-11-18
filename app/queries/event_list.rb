# frozen_string_literal: true
class EventList
  attr_reader :member, :start_date, :end_date

  delegate :team, to: :member

  def initialize(member, start_date: Date.today, end_date: nil)
    @member = member
    @start_date = parse_date(start_date)
    @end_date = parse_date(end_date, @start_date.end_of_month.to_date)
  end

  def each
    return enum_for(:each) unless block_given?

    occurrences
      .sort_by(&:starts_at)
      .each { |occurrence| yield occurrence }
  end

  def all
    each.to_a
  end

  delegate :to_a, :to_ary, to: :each
  delegate :map, to: :all

  private

  def events
    team.events.within(start_date, end_date)
  end

  def occurrences
    Time.use_zone(team.time_zone) do
      events.flat_map do |event|
        event.occurrences.between(start_date, end_date).to_a
      end
    end
  end

  def parse_date(date, default = Date.today)
    if date
      Date.parse(date.to_s)
    else
      default
    end
  end
end
