# frozen_string_literal: true
class InviteMember
  include Cry

  attr_reader :sponsor, :member, :email

  def initialize(sponsor, member, email)
    @sponsor = sponsor
    @member = member
    @email = email
  end

  def call
    invitation = Invitation.new(sponsor: sponsor, member: member, email: email)
    if invitation.save
      publish(:sent, invitation)
    else
      publish(:error, invitation)
    end
  end
end
