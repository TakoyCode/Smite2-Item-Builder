from bs4 import BeautifulSoup
import requests

# print(requests.certs.where())

url = "https://webcms.hirezstudios.com/smite2/api/posts/?filters[slug][$eq]=alpha-weekend-1-playtest-notes&lng=en-US&populate=*null"
# url = "https://www.smite2.com/news/alpha-weekend-1-playtest-notes/"

headers = {"User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"}

requests.packages.urllib3.util.connection.HAS_IPV6 = False
page = requests.get(url, headers=headers)
# , verify=False
# print(page.text)
# test = page.json()
# print(test)

itemsDivIndex = page.text.find("<div>Items</div>")
DefaultItemsStrongIndex = page.text.find("<strong>Default Items every god starts with every game</strong>")
IssuesDivIndex = page.text.find("<div>Issues and Roadmap</div>")


slicedPage = page.text[(DefaultItemsStrongIndex - 3):(IssuesDivIndex - 38)]

soup = BeautifulSoup(slicedPage, features="html.parser")
# print(soup.prettify())

unordered_lists = soup.find_all("ul", recursive=False)
# print(ul_category[2])

# li_items = ul_category[3].find_all("li", recursive=False)
category = [categories.find_all("li", recursive=False) for categories in unordered_lists]
# print(category_items)

index = -1
for items in category:
    # if(index >= 1): 
    for item in items:
        # items_props = [e.text for e in item.contents]
        # item_title = [item.contents[0]]
        item_props = item.contents[1].find_all("li")
        final_props = [item.contents[0], f"Tier: {index}"] + [prop.text for prop in item_props]
        print(final_props)
    index += 1
        # break
    # break

    # class finished_item:
    #     Name = item_title
    #     Properties = item_props
    # print(finished_item.Name, finished_item.Properties)


# print(items[0].find("li"))

# items = [ li_item for li_item in ul_category ]
# print(items[13])    