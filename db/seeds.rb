# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([{username: 'DemoUser123', password: 'DemoUser123'}])
User.first.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/signin.jpeg")), filename: "default_profile_pic.jpeg")