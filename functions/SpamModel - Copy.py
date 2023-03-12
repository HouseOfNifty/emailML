import torch.nn as nn

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

