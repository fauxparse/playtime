# frozen_string_literal: true
require 'rails_helper'
require 'support/features/clearance_helpers'
require 'support/features/invitation_helpers'

RSpec.feature 'User accepts an invitation' do
  let(:user) { create(:user) }
  let(:team) { create(:team) }
  let(:member) { create(:member, team: team) }
  let(:admin) { create(:admin, team: team) }
  let(:email) { 'ripley@sula.co' }

  scenario 'that is valid' do
    send_invitation(admin, member, email)
    click_invitation_link(email)
    sign_in_as(user)
    click_button(t('invitations.show.accept'))

    expect(user.teams).to include team
    expect(current_path).to eq team_path(team)
  end

  scenario 'that does not exist' do
    sign_in_as(user)
    visit(invitation_path('fake'))

    expect(current_path).to eq root_path
    expect(page.body).to have_content t('invitations.flashes.invalid')
  end

  scenario 'to a team they are already a member of' do
    send_invitation(admin, member, email)
    create(:member, user: user, team: team)
    click_invitation_link(email)
    sign_in_as(user)

    expect(current_path).to eq team_path(team)
    expect(Invitation.last).to be_declined
  end

  scenario 'that has already been accepted' do
    send_invitation(admin, member, email)
    Invitation.last.accepted!
    click_invitation_link(email)
    sign_in_as(user)

    expect(current_path).to eq root_path
    expect(page.body).to have_content t('invitations.flashes.invalid')
  end
end
