# frozen_string_literal: true
require 'rails_helper'

RSpec.describe EventsController, type: :controller do
  before { sign_in_as(user) }
  let(:user) { member.user }
  let(:member) { create(:member, :with_user) }
  let(:team) { member.team }
  let(:team_id) { team.to_param }
  let(:json) { JSON.parse(response.body).deep_symbolize_keys }

  describe '#create' do
    def post_create
      post(
        :create,
        params: { team_id: team_id, event: attributes },
        format: :json
      )
    end

    context 'with valid attributes' do
      let(:attributes) do
        {
          name: 'Bug Hunt',
          start: '2016-10-21T21:00:00+13:00',
          end: '2016-10-21T22:00:00+13:00',
          repeat: false
        }
      end

      it 'returns success' do
        post_create
        expect(response).to be_success
      end

      it 'creates an event' do
        expect { post_create }.to change { Event.count }.by(1)
      end

      it 'renders an event' do
        post_create
        expect(json[:name]).to eq 'Bug Hunt'
      end
    end

    context 'with invalid attributes' do
      let(:attributes) do
        {
          name: '',
          start: '2016-10-21T21:00:00+13:00',
          end: '2016-10-21T22:00:00+13:00',
          repeat: false
        }
      end

      it 'does not return success' do
        post_create
        expect(response).not_to be_success
      end

      it 'doesn’t create an event' do
        expect { post_create }.not_to change { Event.count }
      end

      it 'renders errors' do
        post_create
        expect(json[:errors][:name]).to have_exactly(1).item
      end
    end
  end
end
