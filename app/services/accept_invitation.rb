# frozen_string_literal: true
class AcceptInvitation
  include Cry

  attr_reader :invitation, :user

  def initialize(invitation, user)
    @invitation = invitation
    @user = user
  end

  def call
    if invitation.pending? && !already_a_member?
      accept_invitation
    else
      publish(:error, invitation)
    end
  end

  private

  def already_a_member?
    user.teams.include?(invitation.team)
  end

  def accept_invitation
    Invitation.transaction do
      invitation.accepted!
      invitation.member.update!(user: user)
    end
    publish(:accepted, invitation)
  rescue ActiveRecord::RecordInvalid
    publish(:error, invitation)
  end
end
