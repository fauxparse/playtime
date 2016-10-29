# frozen_string_literal: true
class DeclineInvitation
  include Cry

  attr_reader :invitation, :user

  def initialize(invitation, user)
    @invitation = invitation
    @user = user
  end

  def call
    if invitation.pending?
      invitation.declined!
      publish(:declined, invitation)
    else
      publish(:error, invitation)
    end
  end
end
