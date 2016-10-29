# frozen_string_literal: true
require 'rails_helper'

describe MemberMailer do
  include Rails.application.routes.url_helpers

  let(:member) { create(:member, team: team) }
  let(:team) { create(:team) }
  let(:admin) { create(:admin, team: team, user: admin_user) }
  let(:admin_user) { create(:user, email: 'dallas@sula.co') }

  describe '#invitation' do
    subject(:message) { MemberMailer.invitation(invitation) }
    let(:email) { 'ripley@sula.co' }
    let(:invitation) do
      create(:invitation, sponsor: admin, member: member, email: email)
    end

    it 'is sent to the new member' do
      expect(message).to deliver_to 'Ripley <ripley@sula.co>'
    end

    it 'is sent from the admin member' do
      expect(message).to be_delivered_from 'Dallas <dallas@sula.co>'
    end

    it 'has the correct subject' do
      expect(message).to have_subject 'Invitation to join Sulaco'
    end

    it 'has a link to accept the invitation' do
      expect(message).to have_body_text invitation_url(invitation)
    end
  end
end
