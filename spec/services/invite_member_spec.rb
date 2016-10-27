# frozen_string_literal: true
require 'rails_helper'

describe InviteMember do
  subject(:service) { InviteMember.new(sponsor, member, email) }
  let(:sponsor) { create(:admin) }
  let(:member) { create(:member, team: sponsor.team) }
  let(:email) { 'ripley@sula.co' }

  it 'succeeds' do
    expect(service)
      .to receive(:publish)
      .with(:sent, an_instance_of(Invitation))
    service.call
  end
end
