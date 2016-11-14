# frozen_string_literal: true

if ENV.key?('MAILTRAP_API_TOKEN')
  require 'rest_client'
  require 'json'

  response = RestClient::Resource.new("https://mailtrap.io/api/v1/inboxes.json?api_token=#{ENV['MAILTRAP_API_TOKEN']}", ssl_version: "TLSv1").get

  first_inbox = JSON.parse(response)[0]

  SMTP_SETTINGS = {
    :user_name => first_inbox['username'],
    :password => first_inbox['password'],
    :address => first_inbox['domain'],
    :domain => first_inbox['domain'],
    :port => first_inbox['smtp_ports'][0],
    :authentication => :plain
  }.freeze
else
  SMTP_SETTINGS = {
    address: ENV.fetch('SMTP_ADDRESS'), # example: "smtp.sendgrid.net"
    authentication: :plain,
    domain: ENV.fetch('SMTP_DOMAIN'), # example: "heroku.com"
    enable_starttls_auto: true,
    password: ENV.fetch('SMTP_PASSWORD'),
    port: '587',
    user_name: ENV.fetch('SMTP_USERNAME')
  }.freeze
end

if ENV['EMAIL_RECIPIENTS'].present?
  Mail.register_interceptor RecipientInterceptor.new(ENV['EMAIL_RECIPIENTS'])
end
