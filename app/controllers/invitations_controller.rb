# frozen_string_literal: true
class InvitationsController < ApplicationController
  before_action :require_login
  before_action :check_if_already_a_member, only: :show

  def show
    redirect_to root_path, alert: t('invitations.flashes.invalid') \
      unless invitation.present? && invitation.pending?
  end

  def accept
    AcceptInvitation
      .new(invitation, current_user)
      .on(:accepted) { accepted }
      .on(:error) { invalid }
      .call
  end

  def decline
    DeclineInvitation
      .new(invitation, current_user)
      .on(:declined) { declined }
      .on(:error) { invalid }
      .call
  end

  private

  def invitation
    @invitation ||= Invitation.find_by(token: params[:id])
  end

  helper_method :invitation

  def accepted
    redirect_to team_path(invitation.team),
      notice: t('invitations.flashes.accepted')
  end

  def declined
    redirect_to root_path,
      notice: t('invitations.flashes.declined')
  end

  def invalid
    redirect_to root_path,
      alert: t('invitations.flashes.invalid')
  end

  def check_if_already_a_member
    if invitation.present? && current_user.teams.include?(invitation.team)
      invitation.declined!
      redirect_to team_path(invitation.team)
    end
  end
end
