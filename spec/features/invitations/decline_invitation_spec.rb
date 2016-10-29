# frozen_string_literal: true
require 'rails_helper'
require 'support/features/clearance_helpers'
require 'support/features/invitation_helpers'

RSpec.feature 'User declines an invitation' do
  let(:user) { create(:user) }
  let(:team) { create(:team) }
  let(:member) { create(:member, team: team) }
  let(:admin) { create(:admin, team: team) }
  let(:email) { 'ripley@sula.co' }

  scenario 'that is valid' do
    send_invitation(admin, member, email)
    click_invitation_link(email)
    sign_in_as(user)
    click_button(t('invitations.show.decline'))

    expect(user.teams).not_to include team
    expect(current_path).to eq root_path
  end
end
