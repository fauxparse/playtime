# frozen_string_literal: true
class InvitationsController < ApplicationController
  before_action :require_login

  def show
    redirect_to root_path, alert: 'Couldn’t find that invitation' \
      unless invitation.present?
  end

  def accept
    redirect_to team_path(invitation.team), notice: 'Invitation accepted'
  end

  def decline
    redirect_to root_path, notice: 'Invitation declined'
  end

  private

  def invitation
    @invitation ||= Invitation.find_by(token: params[:id])
  end
end
