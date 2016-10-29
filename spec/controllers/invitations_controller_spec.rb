# frozen_string_literal: true
require 'rails_helper'

RSpec.describe InvitationsController, type: :controller do
  let(:invitation) { create(:invitation, email: user.email) }
  let(:user) { create(:user) }

  context 'when logged in' do
    before { sign_in }

    describe 'GET #show' do
      it 'returns http success' do
        get :show, params: { id: invitation.to_param }
        expect(response).to have_http_status(:success)
      end
    end

    describe 'POST #accept' do
      it 'redirects to the team page' do
        post :accept, params: { id: invitation.to_param }
        expect(response).to redirect_to team_path(invitation.team)
      end

      context 'when the user is already a member' do
        before { create(:member, team: invitation.team, user: user) }

        it 'redirects to the home page' do
          post :accept, params: { id: invitation.to_param }
          expect(response).to redirect_to root_path
        end
      end

      context 'when the invitation has already been accepted' do
        before { invitation.accepted! }

        it 'redirects to the home page' do
          post :accept, params: { id: invitation.to_param }
          expect(response).to redirect_to root_path
        end
      end
    end

    describe 'POST #decline' do
      it 'redirects to the home page' do
        post :decline, params: { id: invitation.to_param }
        expect(response).to redirect_to root_path
      end

      context 'when the invitation has already been accepted' do
        before { invitation.accepted! }

        it 'redirects to the home page' do
          post :decline, params: { id: invitation.to_param }
          expect(response).to redirect_to root_path
        end
      end
    end
  end
end
