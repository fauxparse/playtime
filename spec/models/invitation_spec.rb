# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Invitation, type: :model do
  subject(:invitation) { build(:invitation, sponsor: sponsor, member: member) }
  let(:team) { build_stubbed(:team) }
  let(:sponsor) { build_stubbed(:admin, team: team) }
  let(:member) { build_stubbed(:member, team: team) }

  it 'is valid' do
    expect(invitation).to be_valid
  end

  context 'without a sponsor' do
    before { invitation.sponsor = nil }

    it 'is invalid' do
      expect(invitation)
        .to be_invalid
        .and have_exactly(1).error_on(:sponsor_id)
    end
  end

  context 'without a member' do
    before { invitation.member = nil }

    it 'is invalid' do
      expect(invitation)
        .to be_invalid
        .and have_exactly(1).error_on(:member_id)
    end
  end

  context 'without an email address' do
    before { invitation.email = nil }

    it 'is invalid' do
      expect(invitation)
        .to be_invalid
        .and have_exactly(1).error_on(:email)
    end
  end

  context 'for different teams' do
    let(:member) { build_stubbed(:member) }

    it 'is invalid' do
      expect(invitation)
        .to be_invalid
        .and have_exactly(1).error_on(:member_id)
    end
  end
end
