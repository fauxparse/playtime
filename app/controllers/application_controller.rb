# frozen_string_literal: true
class ApplicationController < ActionController::Base
  include Clearance::Controller
  protect_from_forgery with: :exception

  rescue_from ActionController::UnknownFormat, with: :render_blank_default

  before_action :require_login

  private

  def current_team
    @current_team ||= current_user.teams.find_by(slug: team_id)
  end

  def team_id
    params[:team_id]
  end

  def render_blank_default(exception)
    respond_to do |format|
      format.html { render html: '', layout: true }
      format.any { raise exception }
    end
  end
end
