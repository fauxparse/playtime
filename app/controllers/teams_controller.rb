# frozen_string_literal: true
class TeamsController < ApplicationController
  def index
  end

  def show
  end

  private

  def team
    @team ||= current_team
  end

  helper_method :team

  def team_id
    params[:id]
  end
end
