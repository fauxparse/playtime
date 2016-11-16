# frozen_string_literal: true
require 'rails_helper'
require 'support/features/clearance_helpers'

RSpec.feature 'User creates an event', js: true do
  let(:admin) { create(:admin) }
  let(:team) { admin.team }

  scenario 'with valid parameters' do
    sign_in_as(admin.user)
    visit(new_team_event_path(team))
    fill_in('Event name', with: 'Routine salvage operation')
    find(:css, '.new-event [rel="save"]').trigger('click')
    expect(page).to have_content('Routine salvage operation')
    expect(current_path).to eq '/teams/sulaco/events/routine-salvage-operation'
    expect(Event.find_by(name: 'Routine salvage operation')).not_to be_nil
  end
end
