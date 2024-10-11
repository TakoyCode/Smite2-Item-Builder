# For this document i used these videos https://www.youtube.com/watch?v=bargNl2WeN4 and https://www.youtube.com/watch?v=xjA1HjvmoMY
# To learn about the super basics about scraping, requests and BeautifulSoup

from bs4 import BeautifulSoup
import requests

url = "https://www.scrapethissite.com/pages/forms/"

headers = {"User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"}

requests.packages.urllib3.util.connection.HAS_IPV6 = False
req = requests.get(url, headers=headers)
# print(req)

soup = BeautifulSoup(req.text, features='html.parser')
# print(soup.prettify())

p = soup.find_all('td', class_ = "name")
# print(p)

teams = []
for t in p:
    teams.append(t.text.strip())

print(teams)
# for t in teams:
#     print(t)


