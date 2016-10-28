# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Invitation, type: :model do
  subject(:invitation) { build(:invitation, sponsor: sponsor, member: member) }
  let(:team) { create(:team) }
  let(:sponsor) { create(:admin, team: team) }
  let(:member) { create(:member, team: team) }

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
    let(:member) { create(:member) }

    it 'is invalid' do
      expect(invitation)
        .to be_invalid
        .and have_exactly(1).error_on(:member_id)
    end
  end

  context 'for a registered user' do
    before do
      member.update(user: create(:user))
    end

    it 'is invalid' do
      expect(invitation)
        .to be_invalid
        .and have_exactly(1).error_on(:member_id)
    end
  end

  context 'for an email address that is already in use in this team' do
    before do
      create(:member, team: team, user: create(:user, email: invitation.email))
    end

    it 'is invalid' do
      expect(invitation).to be_invalid
      expect(invitation).to have_exactly(1).error_on(:email)
    end
  end
end
