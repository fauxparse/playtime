# frozen_string_literal: true
require 'rails_helper'

RSpec.describe InvitationsController, type: :controller do
  let(:invitation) { create(:invitation, email: user.email) }
  let(:user) { create(:user) }

  describe 'GET #show' do
    it 'returns http success' do
      sign_in_as(user)
      get :show, params: { id: invitation.to_param }
      expect(response).to have_http_status(:success)
    end
  end
end
