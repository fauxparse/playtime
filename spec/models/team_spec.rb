# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Team, type: :model do
  subject(:team) { create(:team, name: 'Sulaco') }

  it 'is valid' do
    expect(team).to be_valid
  end

  describe '#to_param' do
    subject(:param) { team.to_param }

    it 'is generated from the team name' do
      expect(param).to eq 'sulaco'
    end
  end

  context 'without a name' do
    subject(:team) { build(:team, name: nil) }

    it 'is invalid' do
      expect(team)
        .to be_invalid
        .and have_exactly(1).error_on(:name)
    end
  end
end
