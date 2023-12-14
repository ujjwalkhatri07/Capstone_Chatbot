import requests
from haystack.document_stores.elasticsearch import ElasticsearchDocumentStore


document_store_squad = ElasticsearchDocumentStore(host="localhost", username="NISHANT", password="", index="squad_docs_7")
res = requests.get('http://localhost:9200/_cluster/health')
print(res.json())

cluster_settings_url = 'http://localhost:9200/_cluster/settings'
cluster_settings_payload = {
    "transient": {
        "cluster.routing.allocation.disk.threshold_enabled": False
    }
}
headers = {'Content-Type': 'application/json'}
response1 = requests.put(cluster_settings_url, json=cluster_settings_payload, headers=headers)

# Allow index deletion
index_settings_url = 'http://localhost:9200/_all/_settings'
index_settings_payload = {
    "index.blocks.read_only_allow_delete": None
}
response2 = requests.put(index_settings_url, json=index_settings_payload, headers=headers)

# Check responses
print(response1.text)
print(response2.text)

from haystack.nodes import BM25Retriever
from haystack.nodes import DensePassageRetriever
# intialize
retriever = BM25Retriever(document_store=document_store_squad)
#retriever = DensePassageRetriever(document_store=document_store_squad)

def get_context(question):
    response = retriever.retrieve(question)
    print("**********************************")
    print(response)
    print("****************************")
    if len(response) > 0:
        return response[0].to_dict()['content']
