# frozen_string_literal: true
module Features
  module InvitationHelpers
    def send_invitation(admin, member, email)
      InviteMember.new(admin, member, email).call
      expect(unread_emails_for(email)).not_to be_empty
    end

    def click_invitation_link(email)
      open_email(
        email,
        with_subject: t('member_mailer.invitation.subject', team: team)
      )
      click_first_link_in_email
    end
  end
end

RSpec.configure do |config|
  config.include Features::InvitationHelpers, type: :feature
end
