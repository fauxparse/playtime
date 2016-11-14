# frozen_string_literal: true
class EventsController < ApplicationController
  def index
  end

  def new
    respond_to do |format|
      format.json do
        @event = current_team.events.new.tap do |event|
          event.schedule =
            IceCube::Schedule.new(Time.zone.now, duration: 1.hour)
        end
        render json: @event
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
end
