# frozen_string_literal: true
class ApplicationController < ActionController::Base
  include Clearance::Controller
  protect_from_forgery with: :exception

  private

  def current_team
    @current_team ||= current_user.teams.find_by(slug: team_id)
  end

  def team_id
    params[:team_id]
  end
end
