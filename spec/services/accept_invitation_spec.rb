# frozen_string_literal: true
require 'rails_helper'

describe AcceptInvitation, type: :service do
  subject(:service) { AcceptInvitation.new(invitation, user) }
  let(:invitation) { create(:invitation) }
  let(:user) { create(:user) }

  context 'for a valid invitation' do
    it 'succeeds' do
      expect(service).to receive(:publish).with(:accepted, invitation)
      service.call
    end

    it 'adds the user to the team' do
      expect { service.call }.to change { user.teams.count }.by(1)
    end
  end

  context 'when the user is already a member of the team' do
    before { create(:member, team: invitation.team, user: user) }

    it 'fails' do
      expect(service).to receive(:publish).with(:error, invitation)
      service.call
    end

    it 'does not add the user to the team' do
      expect { service.call }.not_to change { user.teams.count }
    end
  end

  context 'when the invitation has already been accepted' do
    before { invitation.accepted! }

    it 'fails' do
      expect(service).to receive(:publish).with(:error, invitation)
      service.call
    end

    it 'does not add the user to the team' do
      expect { service.call }.not_to change { user.teams.count }
    end
  end
end
