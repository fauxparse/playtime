# frozen_string_literal: true
class EventsController < ApplicationController
  def index
  end

  def new
    respond_to do |format|
      format.json { render json: current_team.events.new }
    end
  end
end
