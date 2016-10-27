# frozen_string_literal: true
require 'rails_helper'

describe InviteMember do
  include Rails.application.routes.url_helpers

  subject(:service) { InviteMember.new(sponsor, member, email) }
  let(:sponsor) { create(:admin) }
  let(:member) { create(:member, team: sponsor.team) }
  let(:email) { 'ripley@sula.co' }
  let(:message) { ActionMailer::Base.deliveries.last }

  it 'succeeds' do
    expect(service)
      .to receive(:publish)
      .with(:sent, an_instance_of(Invitation))
    service.call
  end

  it 'creates an invitation' do
    expect { service.call }.to change(Invitation, :count).by(1)
  end

  it 'delivers an email' do
    expect(MemberMailer)
      .to receive(:invitation)
      .with(an_instance_of(Invitation))
    service.call
  end
end
