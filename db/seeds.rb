# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

user = User.create(username: 'DemoUser123', password: 'DemoUser123')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/signin.jpeg")), filename: "default_profile_pic.jpeg")


user = User.create(username: 'Dewey Griffin', password: 'Dewey Griffin')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/signin.jpeg")), filename: "default_profile_pic.jpeg")
video = Video.create(title: "Maple Story", description: "Maple Sit-tory dance", user_id: 2)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/maplestory.jpeg")), filename: "maplestory.jpeg")
file = open("https://yootoob-seeds.s3-us-west-1.amazonaws.com/maplestory.mp4")
video.video.attach(io: file, filename: "maplestory.mp4")

user = User.create(username: 'The Dodo', password: 'The Dodo')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/dodo_profile_pic.jpeg")), filename: "dodo_profile_pic.jpeg")
video = Video.create(title: "Guy Helps Wolf Spider Untangle His Feet | The Dodo", description: 'No Description', user_id: 3)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/dodo.jpeg")), filename: "dodo.jpeg")
file = open("https://yootoob-seeds.s3-us-west-1.amazonaws.com/Guy+Helps+Wolf+Spider+Untangle+His+Feet+_+The+Dodo.mp4")
video.video.attach(io: file, filename: "spider.mp4")

user = User.create(username: 'IGN', password: 'IGNIGN')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/ign.jpeg")), filename: "ign_profile_pic.jpeg")
video = Video.create(title: "Weathering With You Official Subbed Trailer", description: "Weathering With You follows Hodaka, a high school runaway alone in Tokyo. Not long after finding work as a writer for an occult magazine, he meets Hina, a girl who has the ability to clear away the seemingly neverending rain. Makoto Shinkai's (Your Name) next movie hits theaters in North America beginning January 17.", user_id: 4)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/weathering.jpeg")), filename: "weathering.jpeg")
file = open("https://yootoob-seeds.s3-us-west-1.amazonaws.com/Weathering+With+You+Official+Subbed+Trailer.mp4")
video.video.attach(io: file, filename: "Weathering With You Official Subbed Trailer.mp4")

user = User.create(username: 'stopplimertime', password: 'stopplimertime')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/chili.jpg")), filename: "chili_profile_pic.jpg")
video = Video.create(title: "can I get a bowl of that chili", description: 'wake up cole', user_id: 5)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/chili-thumbnail.jpg")), filename: "chili.jpg")
file = open("https://yootoob-seeds.s3-us-west-1.amazonaws.com/can+i+get+a+bowl+of+that+chili.mp4")
video.video.attach(io: file, filename: "can i get a bowl of that chili.mp4")

user = User.create(username: 'Gone Viral', password: 'Gone Viral')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/gone-viral.jpg")), filename: "viral_pic.jpg")
video = Video.create(title: "It's just a frog...", description: 'No Description', user_id: 6)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/frog.jpg")), filename: "frog.jpg")
file = open("https://yootoob-seeds.s3-us-west-1.amazonaws.com/It's+just+a+frog....mp4")
video.video.attach(io: file, filename: "It's just a frog.mp4")

user = User.create(username: 'Jack Stauber', password: 'Jack Stauber')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/JackStauber.jpg")), filename: "jack_profile_pic.jpeg")
video = Video.create(title: 'Hot dogs', description: 'I love you Dougie', user_id: 7)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/dougie.jpg")), filename: "dougie.jpg")
file = open('https://yootoob-seeds.s3-us-west-1.amazonaws.com/hot+dogs.mp4')
video.video.attach(io: file, filename: 'hot_dogs.mp4')

user = User.create(username: 'Scooty Booty', password: 'Scooty Booty')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/scooty.jpg")), filename: "scooty_profile_pic.jpg")
video = Video.create(title: 'You may enter', description: 'That poor kid', user_id: 8)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/enter.jpg")), filename: "enter.jpg")
file = open('https://yootoob-seeds.s3-us-west-1.amazonaws.com/You+may+enter.mp4')
video.video.attach(io: file, filename: 'You may enter.mp4')

user = User.create(username: 'nigahiga', password: 'nigahiga')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/nigahiga.jpg")), filename: "nigahiga_profile_pic.jpg")
video = Video.create(title: "The Big Bouncing Inflatable Green Ball", description: "I made this a long time ago, completely forgot about it. P.S. I was totally gonna do the next one spoofing Oxyclean, can't do that anymore. R.I.P. Billy Mays.", user_id: 9)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/ball.jpg")), filename: "ball.jpg")
file = open("https://yootoob-seeds.s3-us-west-1.amazonaws.com/nigahiga.mp4")
video.video.attach(io: file, filename: "nigahiga.mp4")

user = User.create(username: 'Guinness World Records', password: 'nigahiga')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/records.jpg")), filename: "records_profile_pic.jpg")
video = Video.create(title: "Loudest Purring Cat - Guinness World Records", description: "Merlin, a rescue kitty from Torquay, Devon (UK) now has plenty to make a noise about after being confirmed as having the world record for Loudest purr by a domestic cat. At Guinness World Records we want to show that everyone in the world is the best at something, and we’re here to measure it! Whether you’ve got the stretchiest skin, know the world’s smallest dog or want to create the largest human dominoes chain we want to hear about it. Here on the Guinness World Records YouTube channel we want to showcase incredible talent. If you're looking for videos featuring the world's tallest, shortest, fastest, longest, oldest and most incredible things on the planet, you're in the right place.", user_id: 10)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/cat.jpg")), filename: "cat.jpg")
file = open("https://yootoob-seeds.s3-us-west-1.amazonaws.com/Loudest+Purring+Cat+-+Guinness+World+Records.mp4")
video.video.attach(io: file, filename: "cat.mp4")

user = User.create(username: 'Shirrako', password: 'Shirrako')
user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/shirrako.jpg")), filename: "shirrako_profile_pic.jpg")
video = Video.create(title: "Dark Souls III Soundtrack OST - Soul of Cinder", description: "Dark Souls 3 Official OST Composer: Yuka Kitamura", user_id: 11)
video.thumbnail.attach(io: File.open(File.join(Rails.root, "app/assets/images/souls.jpg")), filename: "souls.jpg")
file = open("https://yootoob-seeds.s3-us-west-1.amazonaws.com/darksouls.mp4")
video.video.attach(io: file, filename: "ds3.mp4")