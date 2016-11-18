# frozen_string_literal: true
class EventsController < ApplicationController
  wrap_parameters include: %i(name start end repeat)

  def index
    respond_to do |format|
      format.json do
        render json: EventList.new(current_member, dates)
      end
    end
  end

  def show
    respond_to do |format|
      format.json { render json: event }
    end
  end

  def new
    respond_to do |format|
      format.json do
        render json: new_blank_event
      end
    end
  end

  def create
    respond_to do |format|
      form = EventForm.new(current_team.events.new, params)
      format.json do
        status = form.save ? :ok : :not_acceptable
        render json: form.event, status: status
      end
    end
  end

  private

  def event
    @event ||= current_team.events.find_by(slug: params[:id])
  end

  def new_blank_event
    current_team.events.new.tap do |event|
      start = (Time.zone.now + 1.hour).beginning_of_hour
      event.schedule = IceCube::Schedule.new(start, duration: 1.hour)
    end
  end

  def dates
    start = parse_date(params[:start], Date.today)
    stop = parse_date(params[:end], start + 1.month - 1.day)
    { start_date: start, end_date: stop }
  end

  def parse_date(param, default)
    param && Date.parse(param) || default
  end
end
