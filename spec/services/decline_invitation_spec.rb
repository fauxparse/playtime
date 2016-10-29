# frozen_string_literal: true
require 'rails_helper'

describe DeclineInvitation, type: :service do
  subject(:service) { DeclineInvitation.new(invitation, user) }
  let(:invitation) { create(:invitation) }
  let(:user) { create(:user) }

  context 'for a valid invitation' do
    it 'succeeds' do
      expect(service).to receive(:publish).with(:declined, invitation)
      service.call
    end

    it 'does not adds the user to the team' do
      expect { service.call }.not_to change { user.teams.count }
    end
  end

  context 'when the invitation has already been accepted' do
    before { invitation.accepted! }

    it 'fails' do
      expect(service).to receive(:publish).with(:error, invitation)
      service.call
    end
  end
end
