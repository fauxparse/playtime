# frozen_string_literal: true
class EventsController < ApplicationController
  def index
  end

  def new
    respond_to do |format|
      format.json do
        event = current_team.events.new.tap do |event|
          event.schedule = IceCube::Schedule.new(Time.zone.now, duration: 1.hour).tap do |s|
            s.add_recurrence_rule IceCube::Rule.monthly.day_of_week(saturday: [2]).until(1.year.from_now)
          end
        end
        render json: event
      end
    end
  end
end
