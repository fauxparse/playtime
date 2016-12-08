# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Availability, type: :model do
  subject(:availability) do
    Availability.new(member: member, occurrence: occurrence)
  end
  let(:event) { create(:event, :scheduled) }
  let(:member) { create(:member, team: event.team) }
  let(:occurrence) { event.occurrences.first.tap(&:save) }

  it { is_expected.to be_valid }

  context 'when availability has already been recorded' do
    before do
      Availability.create!(member: member, occurrence: occurrence)
    end

    it { is_expected.not_to be_valid }
  end
end
