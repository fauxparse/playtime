# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Member, type: :model do
  shared_examples_for 'a valid member' do
    it 'is valid' do
      expect(member).to be_valid
    end

    it 'is not an admin' do
      expect(member).not_to be_admin
    end
  end

  context 'without a team' do
    subject(:member) { build(:member, team: nil) }

    it 'is not valid' do
      expect(member)
        .to be_invalid
        .and have_exactly(1).error_on(:team_id)
    end
  end

  context 'without a user' do
    subject(:member) { build(:member) }

    it_behaves_like 'a valid member'

    describe '#email?' do
      it 'is false' do
        expect(member.email?).to be false
      end
    end

    context 'with admin set' do
      before { member.admin = true }

      it 'is not valid' do
        expect(member)
          .to be_invalid
          .and have_exactly(1).error_on(:admin)
      end
    end
  end

  context 'with a user' do
    subject(:member) { build(:member, :with_user) }

    it_behaves_like 'a valid member'

    describe '#email?' do
      it 'is true' do
        expect(member.email?).to be true
      end
    end

    context 'with admin set' do
      before { member.admin = true }

      it 'is valid' do
        expect(member).to be_valid
      end
    end
  end
end
