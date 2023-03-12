import torch
import torch.nn as nn
import functions_framework


class SpamModel(nn.Module):

    #Initialize the model, maybe put in more hyperparameters later
    def __init__(self, vocabLength):

        #Call the super constructor for all the nn.Module stuff
        super(SpamModel, self).__init__()

        #Define the layers

        #input layer has vocabLength nodes and 256 nodes out
        self.linear1 = nn.Linear(vocabLength, 512)

        #activation function, sigmoid seems to work better
        #self.relu = nn.ReLU()
        self.sigmoid = nn.Sigmoid()
        
        self.linear2 = nn.Linear(512, 256)
        self.linear3 = nn.Linear(256,1)


    #Forward pass
    #Input is a tensor of word indices
    def forward(self, x):

        #Pass the input through the layers
        x = self.linear1(x)
        x = self.sigmoid(x)
        x = self.linear2(x)
        x = self.sigmoid(x)
        x = self.linear3(x)
        x = self.sigmoid(x)
        return x


@functions_framework.http
def useModel(request):

    vocab = torch.load('vocab88.pt', map_location='cpu')
    model = SpamModel(len(vocab))


    model.load_state_dict(torch.load('model88.pt', map_location='cpu'))

    model.eval()


    text = request.args['text']
    text = text.split(" ")

    tokens = []
    for word in text:
        if word in vocab:
            tokens.append(vocab[word])
        else:
            tokens.append(vocab['<UNK>'])

    while len(tokens) < len(vocab):
        tokens.append(vocab['<PAD>'])
    tokens = torch.tensor(tokens, dtype=torch.float32)
    prediction = model(tokens)
    
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return (str(torch.round(prediction).item()), 200, headers)
        
