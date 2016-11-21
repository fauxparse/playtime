# frozen_string_literal: true
class Occurrences
  attr_reader :event

  def initialize(event)
    @event = event
  end

  def size
    if schedule.terminating?
      schedule.all_occurrences.size
    else
      BigDecimal::INFINITY
    end
  end
  alias count size

  def between(start_date, end_date = start_date + 1.day, &block)
    collection = Collection.new(event, start_date, end_date)

    if block_given?
      collection.each(&block)
    else
      collection
    end
  end

  def first
    between(event.starts_at.to_date).first
  end

  delegate :schedule, to: :event

  class Collection
    attr_reader :event

    def initialize(event, start_date, end_date)
      Time.use_zone(event.time_zone) do
        @event = event
        @start = convert_start(start_date)
        @end = convert_end(end_date)
      end
    end

    def size
      occurrences.size
    end
    alias count size

    def each
      return enum_for(:each) { size } unless block_given?

      occurrences.each do |start_time|
        yield occurrence_at(start_time)
      end
    end

    delegate :schedule, to: :event
    delegate :to_a, :to_ary, :map, :first, to: :each

    private

    def occurrence_at(start_time)
      existing[start_time.to_i] ||
        Occurrence.new(
          event: event,
          starts_at: event.time_zone.at(start_time.to_i)
        )
    end

    def occurrences
      @occurrences ||= schedule.occurrences_between(@start, @end)
    end

    def existing
      @existing ||=
        Occurrence.for_event(event).between(@start, @end)
                  .each.with_object({}) do |occurrence, hash|
                    hash[occurrence.starts_at.to_i] = occurrence
                  end
    end

    def convert_start(date)
      case date
      when Time, DateTime then event.time_zone.at(date)
      when Date then date.to_date.beginning_of_day
      else Time.zone.parse(date)
      end
    end

    def convert_end(date)
      case date
      when Time, DateTime then Time.zone.at(date)
      when Date then date.to_date.end_of_day
      else Time.zone.parse(date).end_of_day
      end
    end
  end
end
