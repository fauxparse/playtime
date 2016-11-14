# frozen_string_literal: true
require 'rails_helper'

describe ApplicationController do
  describe '#current_member' do
    controller do
      def member
        render json: current_member
      end

      private

      def current_member
        @current_member = nil
        super
      end
    end

    before do
      routes.draw { get 'member/:team_id' => 'anonymous#member' }
    end

    context 'when signed in' do
      let(:user) { create(:user) }
      let(:team) { create(:team) }
      let(:json) { JSON.parse(response.body).deep_symbolize_keys }

      before { sign_in_as(user) }

      it 'renders a new member' do
        get :member, params: { team_id: team.to_param }
        expect(json[:id]).to be_nil
      end

      context 'as a team member' do
        it 'renders the existing member' do
          member = team.members.create!(user: user, name: 'Ripley')
          get :member, params: { team_id: team.to_param }
          expect(user.members.with_team_id(team.to_param).first).not_to be_nil
          expect(json).to match a_hash_including(id: member.to_param)
        end
      end
    end
  end
end
