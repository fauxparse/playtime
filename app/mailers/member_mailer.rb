# frozen_string_literal: true
class MemberMailer < ApplicationMailer
  def invitation(invitation)
    @invitation = invitation
    @url = invitation_url(@invitation)
    mail(
      from: email_address(invitation.sponsor),
      to: email_address(invitation.member, email: invitation.email),
      subject: I18n.t('member_mailer.invitation.subject', team: invitation.team)
    )
  end

  private

  def email_address(object, options = {})
    Mail::Address.new.tap do |email|
      email.display_name = options[:name] || object.name
      email.address = options[:email] || object.email
    end
  end
end
