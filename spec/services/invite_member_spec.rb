# frozen_string_literal: true
require 'rails_helper'

describe InviteMember do
  include Rails.application.routes.url_helpers

  subject(:service) { InviteMember.new(sponsor, member, email) }
  let(:team) { create(:team) }
  let(:sponsor) { create(:admin, team: team) }
  let(:member) { create(:member, team: team) }
  let(:email) { 'ripley@sula.co' }
  let(:message) { double }

  it 'succeeds' do
    expect(service)
      .to receive(:publish)
      .with(:sent, an_instance_of(Invitation))
    service.call
  end

  it 'creates an invitation' do
    expect { service.call }
      .to change(Invitation, :count).by(1)
  end

  it 'delivers an email' do
    expect(MemberMailer)
      .to receive(:invitation)
      .exactly(1).times
      .with(an_instance_of(Invitation))
      .and_return(message)
    expect(message)
      .to receive(:deliver_later)
    service.call
  end

  context 'with a bad invitation' do
    before do
      create(:member, team: team, user: create(:user, email: email))
    end

    it 'fails' do
      expect(service)
        .to receive(:publish)
        .with(:error, an_instance_of(Invitation))
      service.call
    end
  end
end
