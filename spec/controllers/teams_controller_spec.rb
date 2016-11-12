# frozen_string_literal: true
require 'rails_helper'

RSpec.describe TeamsController, type: :controller do
  describe 'GET #index' do
    it 'returns http success' do
      sign_in
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #show' do
    let(:member) { create(:member, :with_user) }
    let(:team) { member.team }

    it 'returns http success' do
      sign_in_as(member.user)
      get :show, params: { id: team }, format: :json
      expect(response).to have_http_status(:success)
    end
  end
end
