# For this document i used this video https://www.youtube.com/watch?v=8dTpNajxaH0 
# To learn the scraping basics

from bs4 import BeautifulSoup
import requests

url = "https://en.wikipedia.org/wiki/List_of_largest_companies_in_the_United_States_by_revenue"

headers = {"User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"}

requests.packages.urllib3.util.connection.HAS_IPV6 = False
req = requests.get(url, headers=headers)

soup = BeautifulSoup(req.text, features="html.parser")

table = soup.find("table", class_="wikitable sortable")
# table = soup.find_all("table", class_="wikitable sortable")[0]

company_titles = table.find_all("th")
# print(company_titles)

# Gets all the table headers from the selected table
company_table_titles = [title.text.strip() for title in company_titles]
# print(company_table_titles)

# Gets all the table rows from the selected table
table_data = table.find_all("tr")

table_row_data = []

# Gets all the table data from the table row, and puts that data into an array
# [1:] is the array slice syntax. 
# And means that its a copy of the original array, but only has all the values starting from index 1
for row in table_data[1:]:
        row_data = row.find_all("td")
        individual_row_data = [data.text.strip() for data in row_data]
        if(individual_row_data != []):
            table_row_data.append(individual_row_data)
            # print(individual_row_data)

print(table_row_data)

# Was trying to only get the first 6 titles, but learned of a better way to do it
# i = 0
# for h in titles:
#     print(h.text.strip())
#     i += 1
#     if(i >= 7):
#         break
